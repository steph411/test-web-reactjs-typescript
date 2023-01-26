import React, {useRef, useState} from "react";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import FormikFileDropZones, {FileUploadType} from "../../form/FormikFileDropZone";
import {Form, Formik} from "formik";
import {FormikTextField} from "../../form/FormikTextField";
import * as Yup from "yup";
import {useSnackbar} from "notistack";
import {Article} from "../types";

interface AddPostFormProps {
    open: boolean;
    onClose: any;
    onSubmit: (value: Partial<Article>) => void;
}

const AddPostForm = (props: AddPostFormProps) => {
    const {open, onClose, onSubmit} = props;
    const submitBtn = useRef(null);
    const {enqueueSnackbar} = useSnackbar();

    const [loading, setLoading] = useState(false);

    const validations = {
        title: Yup.string()
            .typeError('Ce champ est requis')
            .required("Ce champ est requis"),
        content: Yup.string()
            .typeError('Ce champ est requis')
            .required("Ce champ est requis"),
    }

    const getLocalSrc = (file: File) => {
        return URL.createObjectURL(file)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle>
                Ajouter un post
            </DialogTitle>
            <DialogContent>
                <Formik
                    validationSchema={Yup.object().shape(validations)}
                    initialValues={{images: null, content: '', title: ""}}
                    onSubmit={async (values, formikHelpers) => {
                        setLoading(true);
                        onSubmit({
                            title: values.title,
                            content: values.content,
                            image: values.images ? getLocalSrc((values.images as FileUploadType).file) : "https://www.01net.com/app/uploads/2020/12/MEA-Photos-App-windows-10-1.jpg",
                        });
                        enqueueSnackbar("Post envoyé avec succès", {
                            variant: "success"
                        });
                        onClose();

                        setLoading(false);
                    }}
                >
                    {({
                          handleSubmit,
                      }) =>
                        <Form onSubmit={handleSubmit} className={'form'}>
                            <FormikTextField
                                fullWidth
                                xs={12}
                                autoFocus
                                variant={'outlined'}
                                label={"Titre"}
                                name={"title"}
                                sx={{
                                    mt: 2
                                }}
                                id={"input_title"}
                            />
                            <FormikTextField
                                fullWidth
                                xs={12}
                                variant={'outlined'}
                                label={"Contenu"}
                                name={"content"}
                                multiline
                                rows={4}
                                sx={{
                                    my: 2
                                }}
                                id={"input_description"}
                            />
                            <FormikFileDropZones
                                name={"images"}
                                onChange={() => {
                                }}
                            />
                            <Button
                                ref={submitBtn}
                                fullWidth
                                type={"submit"}
                                sx={{display: "none"}}
                            />
                        </Form>
                    }
                </Formik>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onClose()}
                    color={"error"}
                    variant={"text"}
                >
                    Annuler
                </Button>
                <Button
                    disabled={loading}
                    onClick={() => {
                        //@ts-ignore
                        submitBtn.current?.click();
                    }}
                    color={"primary"}
                    variant={"text"}
                >
                    {loading ? <CircularProgress/> : "Envoyer"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPostForm