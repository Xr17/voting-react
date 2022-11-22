import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import WorkflowStatusChangeEvent from "../events/WorkflowStatusChangeEvent";
import RegisterVoter from "../voting/RegisterVoter";
import VoterRegisteredEvent from "../events/VoterRegisteredEvent";
import ProposalRegisteredEvent from "../events/ProposalRegisteredEvent";
import VotedEvent from "../events/VotedEvent";

function History() {
  const { state: { contract, accounts } } = useEth();
    const [history, setHistory] = useState();

    useEffect(() => {
        if (contract?.methods) {

            contract.events.WorkflowStatusChange ()
                .on("connected", function(subscriptionId){ console.log(subscriptionId);})
                .on('data', function(event){
                    refreshEvents();
                })

            contract.events.VoterRegistered ()
                .on("connected", function(subscriptionId){ console.log(subscriptionId);})
                .on('data', function(event){
                    refreshEvents();
                })
            contract.events.ProposalRegistered ()
                .on("connected", function(subscriptionId){ console.log(subscriptionId);})
                .on('data', function(event){
                    refreshEvents();
                })

            refreshEvents();
        }
    }, [contract]);

    const refreshEvents = ()=>{
        contract.getPastEvents( {
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ console.log(events); })
            .then(function(events){
                setHistory(events);
            });
    }
    const renderEvent = (e) =>{
        switch(e.event) {
            case 'WorkflowStatusChange':
                return <WorkflowStatusChangeEvent key={e.blockNumber} event={e}></WorkflowStatusChangeEvent>;
            case 'VoterRegistered':
                return <VoterRegisteredEvent key={e.blockNumber} event={e}></VoterRegisteredEvent>
            case 'ProposalRegistered':
                return <ProposalRegisteredEvent key={e.blockNumber} event={e}></ProposalRegisteredEvent>
            case 'Voted':
                return <VotedEvent key={e.blockNumber} event={e}></VotedEvent>
            default:
                console.log(e);
        }
    }

  return (
    <div className="history">
        <div>
            {history?.map(e => renderEvent(e))}
        </div>
    </div>
  );
}

export default History;