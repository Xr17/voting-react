import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Button, Card, CardActions, CardContent, IconButton, InputBase, Paper} from "@mui/material";
import {useEth} from "../../contexts/EthContext";


function RegisterProposal(data) {

    const {state: {contract, accounts, web3}} = useEth();
    const [proposal, setProposal] = useState("");

    const addProposal = async e => {
        await contract.methods.addProposal(proposal).send({from: accounts[0]});
    }

    const handleProposalChange = e => {
        setProposal(e.target.value);
    };

    if (data.isFinished) {
        return (
            <Card sx={{minWidth: 800}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="div">
                        Proposal registration are closed !
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                    </Typography>
                    <Typography variant="body2">

                    </Typography>
                </CardContent>
                <CardActions>
                    {data.isOwner &&
                        <Button onClick={data.next} size="small" color="success" variant="contained">Start Voting
                            Session</Button>}
                </CardActions>
            </Card>
        )
    } else {
        return (
            <Card sx={{minWidth: 800}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="div">
                        Registering proposals
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                    </Typography>
                    <Typography variant="body2">
                        {!data.isVoter &&
                            <h1>You are not allowed to register a proposal</h1>

                        }


                        {data.isVoter &&  <Paper
                                component="form"
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                            >



                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Registering proposals"
                                    sx={{minWidth: 400, height: "10px"}} id="filled-basic" value={proposal}
                                    onChange={handleProposalChange} label="Voter address" variant="filled"
                                />
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                                    <Button onClick={addProposal} variant="contained">Add proposal</Button>
                                </IconButton>

                            </Paper> }


                    </Typography>
                </CardContent>
                <CardActions>
                    {data.isOwner && !data.isFinished &&<Button onClick={data.next} size="small" color="warning" variant="contained">End Proposal
                        Session</Button>}
                    {data.isOwner && data.isFinished &&<Button onClick={data.next} size="small" color="success" variant="contained">Start Voting
                        Session</Button>}
                </CardActions>
            </Card>
        )
    }
}

export default RegisterProposal;
