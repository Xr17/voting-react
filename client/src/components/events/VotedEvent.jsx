import {Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";

function VotedEvent({event}) {


  return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>{event.returnValues.voter}</b> vote for proposal <b>{event.returnValues.proposalId}</b>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">

              </Typography>

          </CardContent>
      </Card>


    );
}

export default VotedEvent;