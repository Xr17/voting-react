import React, {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import RegisterVoter from "../voting/RegisterVoter";
import RegisterProposal from "../voting/RegisterProposal";
import Vote from "../voting/Vote";
import withStyles from "@material-ui/core/styles/withStyles";
import VoteTailed from "../voting/VoteTailed";
import History from "./History";

const styles = theme => ({});

function Web3stuff() {
    const {state: {contract, accounts}} = useEth();
    const [activeStep, setActiveStep] = useState();
    const [owner, setOwner] = useState();
    const [user, setUser] = useState();

    const retrieveOwner = async () => {
        const owner = await contract.methods.owner().call({from: accounts[0]});
        setOwner(owner);
    }

    const retrieveIsVoter = async () => {
        const voter = await contract.methods.getVoter(accounts[0]).call({from: accounts[0]});
        setUser(voter);
    }

    const getStatus = async () => {
        const activeStep = await contract.methods.workflowStatus().call({from: accounts[0]});
        setActiveStep(parseInt(activeStep));
    }

    const isOwner = () => {
        return accounts && accounts[0] && accounts[0] === owner;
    }



    useEffect(() => {
        if (contract?.methods) {
            retrieveOwner();
            getStatus();
            retrieveIsVoter();
        }
    }, [contract]);


    const steps = ["Register Voter", "Register Proposal", "Vote", "Results"];

    function getStepContent(step) {
        if(!isOwner() && !user?.registered){
            return <h1 color={"red"}>You don't have access to this vote</h1>
        }
        switch (step) {
            case 0:
                return <RegisterVoter next={next} isVoter={user?.registered} isOwner={isOwner()}/>;
            case 1:
                return <RegisterProposal isFinished={false} isVoter={user?.registered} isOwner={isOwner()} next={next}/>;
            case 2:
                return <RegisterProposal isFinished={true} isVoter={user?.registered} isOwner={isOwner()} next={next}/>;
            case 3:
                return <Vote isFinished={false} voter={user} isOwner={isOwner()} next={next}/>;
            case 4:
                return <Vote isFinished={true} voter={user} isOwner={isOwner()} next={next}/>;
            case 5:
                return <VoteTailed isVoter={user?.registered} />;
        }
    }

    const next = async () => {

        switch (activeStep) {
            case 0:
                await contract.methods.startProposalsRegistering().send({from: accounts[0]});
                break;
            case 1:
                await contract.methods.endProposalsRegistering().send({from: accounts[0]});
                break;
            case 2:
                await contract.methods.startVotingSession().send({from: accounts[0]});
                break;
            case 3:
                await contract.methods.endVotingSession().send({from: accounts[0]});
                break;
            case 4:
                await contract.methods.tallyVotes().send({from: accounts[0]});
                break;
        }
        await getStatus();
    }


    const handleNext = () => {

    };


    return (<div>

            <h1>Voting Dapp </h1>
            <small>Welcome {accounts && accounts[0]}</small>
           <br/>
            {activeStep != null && getStepContent(activeStep)}
            <hr/>
            <h1>History</h1>
            <History></History>


        </div>
    );
}

export default withStyles(styles)(Web3stuff);

/*
    <div className="web3stuff">
        <Address accounts={accounts}/>
        <Voting></Voting>
        Voting is currently <b>{WORKFLOW_STATUS_CHANGE_NAMES[status]}</b>
        <Button refreshBalance={()=>{}}/>

    </div>
 */