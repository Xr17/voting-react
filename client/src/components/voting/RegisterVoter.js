import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useEth} from "../../contexts/EthContext";
import {WORKFLOW_STATUS_CHANGE_NAMES} from "../Web3stuff/WorkflowStatusChangeEvent";
import {Button, Card, CardActions, CardContent, Divider, IconButton, InputBase, Paper} from "@mui/material";

function SearchIcon() {
    return null;
}

function RegisterVoter(data) {

    const { state: { contract, accounts, web3 } } = useEth();
    const [inputValue, setInputValue] = useState("");
    const [inputAddress, setInputAddress] = useState("");


    const handleAddressChange = e => {
        setInputAddress(e.target.value);
    };

    const addVoter = async e=>{
        if (!web3.utils.isAddress(inputAddress)) {
            alert("invalid address")
        }
        await contract.methods.addVoter(inputAddress).send({ from: accounts[0] });
    }

    if(!data.isOwner){
        return ( <Card sx={{ minWidth: 800 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                </Typography>
                <Typography variant="h5" component="div">
                    Voting and Proposal are not started yet.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                </Typography>
                <Typography variant="body2">


                </Typography>
            </CardContent>
        </Card>)
    }

        return (
            <Card sx={{ minWidth: 800 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                    </Typography>
                    <Typography variant="h5" component="div">
                        Registering voter
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    </Typography>
                    <Typography variant="body2">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Add voter"
                                 sx={{ minWidth: 400, height:"10px" }}id="filled-basic" value={inputAddress}  onChange={handleAddressChange} label="Voter address" variant="filled"
                            />
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <Button  onClick={addVoter}  variant="contained">Add voter</Button>
                            </IconButton>
                        </Paper>

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={data.next} size="small" color="success"variant="contained">Start Proposal Session</Button>
                </CardActions>
            </Card>
        )
}

export default RegisterVoter;
