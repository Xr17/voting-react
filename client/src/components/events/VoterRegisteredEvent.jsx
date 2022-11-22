import {Card, CardActions, CardContent, Typography} from "@mui/material";

function VoterRegisteredEvent({event}) {

  return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>{event.returnValues.voterAddress}</b> has been allowed to vote
              </Typography>
          </CardContent>
      </Card>


    );
}

export default VoterRegisteredEvent;