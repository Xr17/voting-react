import React,{useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {useEth} from "../../contexts/EthContext";
import {Button, Card, CardActions, CardContent, IconButton, InputBase, Paper} from "@mui/material";

function RegisterProposal(data) {

    const {state: {contract, accounts, web3}} = useEth();
    const [proposalId, setProposalId] = useState("");
    const [proposals, setProposals] = useState("");

    const addVote = async e => {
        await contract.methods.setVote(web3.utils.toBN(proposalId)).send({from: accounts[0]});
    }

    const handleProposalChange = e => {
        setProposalId(e.target.value);
    };

    useEffect(() => {
        if (contract?.methods) {
            refreshProposals();
        }
    }, [contract]);

    const refreshProposals = ()=>{
        contract.getPastEvents( "ProposalRegistered",{
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ console.log(events); })
            .then(function(events){
                setProposals(events);
            });
    }

    contract.events.ProposalRegistered ()
        .on("connected", function(subscriptionId){ console.log(subscriptionId);})
        .on('data', function(event){
            refreshProposals();
        })
        return (
            <Card sx={{minWidth: 800}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="div">
                        {data.isFinished && <h1>Votes are closed !</h1>}
                        {!data.isFinished && <h1>Registering Vote</h1>}

                        {proposals && proposals?.map(p=>

                            <Card style={{
                                cursor:"pointer",
                                backgroundColor:p.returnValues.proposalId == ""+data.voter.votedProposalId?"green":"white"
                            }} key = {p.returnValues.proposalId} sx={{ width: 275 }} onClick={()=>addVote(p.returnValues.proposalId)}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                       <b>{p.returnValues.description}</b>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        by {p.returnValues.userAddress}

                                    </Typography>

                                </CardContent>
                            </Card>
                        )}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                    </Typography>

                </CardContent>
                <CardActions>
                    {data.isOwner && !data.isFinished &&<Button onClick={data.next} size="small" color="warning" variant="contained">End Voting
                        Session</Button>}
                    {data.isOwner && data.isFinished &&<Button onClick={data.next} size="small" color="success" variant="contained">Tail votes</Button>}
                </CardActions>
            </Card>
        );
}

export default RegisterProposal;

/*
 <Typography variant="body2">
                        {!data.isVoter &&
                            <h1>You are not allowed to vote for a proposal</h1>

                        }


                        {data.isVoter && !data.isFinished &&  <Paper
                            component="form"
                            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                        >



                            <InputBase
                                sx={{ml: 1, flex: 1}}
                                placeholder="Proposal Id"
                                sx={{minWidth: 400, height: "10px"}} id="filled-basic" value={proposalId}
                                onChange={handleProposalChange} label="Proposal Id" variant="filled"
                            />
                            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                                <Button onClick={addProposal} variant="contained">Add Vote</Button>
                            </IconButton>

                        </Paper> }


                    </Typography>
 */