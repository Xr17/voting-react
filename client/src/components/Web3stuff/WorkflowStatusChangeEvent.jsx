import {Card, CardActions, CardContent, Typography} from "@mui/material";
export const WORKFLOW_STATUS_CHANGE_NAMES = ['RegisteringVoters','ProposalsRegistrationStarted', 'ProposalsRegistrationEnded','VotingSessionStarted','VotingSessionEnded','VotesTallied'];

function WorkflowStatusChangeEvent({event}) {



  return (
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Workflow status has been changed from <b>{WORKFLOW_STATUS_CHANGE_NAMES[event.returnValues.previousStatus]}</b> to <b>{WORKFLOW_STATUS_CHANGE_NAMES[event.returnValues.newStatus]}</b>
              </Typography>
          </CardContent>
      </Card>


    );
}

export default WorkflowStatusChangeEvent;