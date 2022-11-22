import React, {useState,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import {useEth} from "../../contexts/EthContext";

function VoteTailed(data) {
    const {state: {contract, accounts, web3}} = useEth();
    const [proposal, setProposal] = useState();

    useEffect(() => {
        if (contract?.methods) {
            (data.isVoter || data.isOwner) && getWinner();
        }
    }, [contract]);


    const getWinner = async () => {
        const winnerId = await contract.methods.winningProposalID().call({from: accounts[0]});
        const proposal = await contract.methods.getOneProposal(web3.utils.toBN(winnerId)).call({from: accounts[0]});
        setProposal(proposal);
    }
    return (
        <Card sx={{minWidth: 800}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>

                </Typography>
                <Typography variant="h5" component="div">
                  Vote finished ! Winner is : <b>{proposal?.description}</b> with <b>{proposal?.voteCount}</b> votes !

                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                </Typography>
                <Typography variant="body2">

                </Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
}

export default VoteTailed;
