import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from 'react-query';
import axios from 'axios';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 0 12px 8px hsla(220, 25%, 80%, 0.2)'
      : '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
  outline: '1px solid',
  backgroundImage: `url(${theme.palette.mode === 'light'
    ? '/static/images/templates/templates-images/hero-light.png'
    : '/static/images/templates/templates-images/hero-dark.png'
    })`,
  backgroundSize: 'cover',
  outlineColor:
    theme.palette.mode === 'light'
      ? 'hsla(220, 25%, 80%, 0.5)'
      : 'hsla(210, 100%, 80%, 0.1)',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState<FileList | null>(null); // Add this state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files); // Set the files when changed

    }
  }

  const mutation = useMutation((data: FormData) =>
    axios.post('http://localhost:5000/api/v1/files/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries((formData as any).entries());
    // console.log(formData, formJson,'the formdata and the form json');
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]); // Append each file to the form data
      }
    }
    mutation.mutate(formData, {
      onSuccess: (data: any) => {
        console.log(data);
        // Extract the fileName from the response
        const fileName = data?.data?.fileName;
        // Construct the URL for the GET request
        const url = `http://127.0.0.1:5000/api/v1/files/${fileName}`;
        // Make the GET request
        fetch(url)
          .then(response => response.blob())
          .then(blob => {
            // Create a blob URL and download the file
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            link.click();
            handleClose();
          })
          .catch(error => console.error(error));

        return data;
      },

      onError: (error: any) => {
        console.error(error);
      }
    });
  }
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Convert&nbsp;images to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              pdf
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: { sm: '100%', md: '80%' } }}
          >
            Explore our cutting-edge web application, delivering high-quality solutions
            tailored to your needs.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            {/* <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
            //   slotProps={{
            //     htmlInput: {
            //       autoComplete: 'off',
            //       'aria-label': 'Enter your email address',
            //     },
            //   }}
            /> */}

            {/* <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" size="large" component="span">
                Upload now
              </Button>
            </label> */}
            <Button variant="contained" color="primary" size="large" onClick={handleClickOpen} >
              Upload now
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center">
            By clicking &quot;Upload now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: onSubmit
          }}
        >
          <DialogTitle>Images per page</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Specify the number of images per page
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="img_per_page"
              label="Number of images per page"
              type="number"
              fullWidth
              variant="standard"
            />
            <input
              accept="image/*"
              // style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={mutation.isLoading}>Cancel</Button>
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}