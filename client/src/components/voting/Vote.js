import React,{useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useEth} from "../../contexts/EthContext";
import {Button, Card, CardActions, CardContent, IconButton, InputBase, Paper} from "@mui/material";

function RegisterProposal(data) {

    const {state: {contract, accounts, web3}} = useEth();
    const [proposalId, setProposalId] = useState("");

    const addProposal = async e => {
        await contract.methods.setVote(web3.utils.toBN(proposalId)).send({from: accounts[0]});
    }

    const handleProposalChange = e => {
        setProposalId(e.target.value);
    };


        return (
            <Card sx={{minWidth: 800}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="div">
                        {data.isFinished && <h1>Votes are closed !</h1>}
                        {!data.isFinished && <h1>Registering Vote</h1>}

                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                    </Typography>
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
