import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import discordIcon from '@iconify/icons-simple-icons/discord';
import vkIcon from '@iconify/icons-simple-icons/vk';
import { Stack, Button, Divider, Typography } from '@mui/material';

const SOCIAL = [
  {color:"#DF3E30", icon:googleFill, policy: "google"}, 
  {color:"#0077ff", icon:vkIcon, policy: "vk"},
  {color:"#5468ff", icon:discordIcon, policy: "discord"}
]

export default function AuthSocial({onSubmit}) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        {
          SOCIAL.map(({policy, ...props}) => (
            <Button key={policy} onClick={() => onSubmit(policy)} fullWidth size="large" color="inherit" variant="outlined">
              <Icon {...props} height={24} />
            </Button>
          ))
        }
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
