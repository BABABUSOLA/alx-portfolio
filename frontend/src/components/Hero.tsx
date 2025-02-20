import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "react-query";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFiles(null); // Reset files when dialog is closed
    setPreviewUrls([]); // Reset preview URLs
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(files);

      // Generate preview URLs for the selected images
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const mutation = useMutation((data: FormData) =>
    axios.post(
      "https://alx-portfolio-image-to-pdf-483870948389.africa-south1.run.app/api/v1/files/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();

    // Append the number of images per page
    const imagesPerPage = (
      event.currentTarget.elements.namedItem("img_per_page") as HTMLInputElement
    ).value;
    formData.append("img_per_page", imagesPerPage);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]); // Append each file to the form data
    }
    // Submit the form data
    mutation.mutate(formData, {
      onSuccess: (data: any) => {
        const fileName = data?.data?.fileName;
        const url = `https://alx-portfolio-image-to-pdf-483870948389.africa-south1.run.app/api/v1/files/${fileName}`;
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            link.click();
            handleClose(); // Close the dialog after successful submission
          })
          .catch((error) => console.error(error));
      },
      onError: (error: any) => {
        console.error(error);
        alert("An error occurred while uploading the files. Please try again.");
      },
    });
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
            : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        backgroundRepeat: "no-repeat",
        padding: theme.spacing(4),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "primary.dark"
                  : "primary.light",
            }}
          >
            Convert&nbsp;images to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "inherit",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "secondary.main"
                    : "secondary.light",
              }}
            >
              PDF
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: { sm: "100%", md: "80%" }, fontSize: "1.25rem" }}
          >
            Explore our cutting-edge web application, delivering high-quality
            solutions tailored to your needs.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleClickOpen}
              startIcon={<CloudUploadIcon />}
              sx={{
                fontWeight: 600,
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              Upload now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.7 }}
          >
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
            component: "form",
            onSubmit: onSubmit,
            sx: {
              borderRadius: 2,
              padding: 2,
            },
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Images per page</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Specify the number of images per page
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="img_per_page"
              name="img_per_page"
              label="Number of images per page"
              type="number"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              component="label"
              variant="outlined"
              color="primary"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload images
              <VisuallyHiddenInput
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
            </Button>

            {/* Image Preview Section */}
            {previewUrls.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Selected Images:
                </Typography>
                <ImageList cols={3} gap={8}>
                  {previewUrls.map((url, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "100%", borderRadius: 4 }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={mutation.isLoading}
              sx={{ fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isLoading || !files || files.length === 0}
              sx={{ fontWeight: 600 }}
            >
              {mutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
