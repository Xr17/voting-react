import {Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";

function ProposalRegisteredEvent({event}) {


  return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>{event.returnValues.userAddress}</b> proposed <b>{event.returnValues.description}</b> (<b>{event.returnValues.proposalId})</b>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {'<p>'+new Date(event.timestamp)+'<p>'}
              </Typography>

          </CardContent>
      </Card>


    );
}

export default ProposalRegisteredEvent;