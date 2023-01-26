import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useSnackbar} from 'notistack';
import {Box, FormHelperText, Theme, Typography} from "@mui/material";
import {FormikFieldWrapper, FormikFieldWrapperProps} from "./FormikFieldWrapper";
import {useField} from "formik";
import {SystemStyleObject} from "@mui/system/styleFunctionSx/styleFunctionSx";

export interface FileUploadType {
    src: string
    file: File
    id: string
}


const classes: { [key: string]: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>) } = {
    dropZone: theme => ({
        border: `1px dashed ${theme.palette.secondary.main}`,
        padding: '16px 16px',
        outline: 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            // backgroundColor: theme.palette.action.hover,
            opacity: 0.5,
            cursor: 'pointer'
        }
    }),
    imgContainer: {
        display: 'flex',
        marginTop: 1,
        overflowX: 'auto',
        flexWrap: "wrap",
    },
    imgItem: {
        marginRight: 1,
        height: 130,
        width: 130,
        overflow: 'hidden',
        position: 'relative',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: '#e5e5e5',
            border: '1px solid #e5e5e5'
        },
    },
    action: {
        position: 'absolute !important',
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer"
    },
    dragActive: {
        border: theme => `1px dashed ${theme.palette.primary.main}`,
        opacity: 0.5
    }
};


export const isFileImage = (type: string) => {
    return [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'webp',
        'png',
        'jpg',
        'jpeg'
    ].includes(type)
};

interface AssetDropZones extends Partial<FormikFieldWrapperProps> {
    name: string
    label?: string
    onChange?: (values: FileUploadType) => void
    onMultipleChange?: (values: FileUploadType[]) => void
    value?: FileUploadType
}

export default function FormikFileDropZones(props: AssetDropZones) {
    const {enqueueSnackbar} = useSnackbar();
    const {xs, md, lg, gridClassName, ...rest} = props;

    const [imgIdToDelete, setImgIdToDelete] = useState<string[]>([]);

    const [field, meta, helpers] = useField<FileUploadType | FileUploadType[] | null>({
        name: props.name,
    });


    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {

            if (acceptedFiles.findIndex((file) => !isFileImage(file.type)) !== -1) {
                enqueueSnackbar("Veuillez sélectionner seulement des images JPEG, PNG, WEBP ou Avif", {
                    variant: 'warning'
                });
            } else {
                helpers.setTouched(true);
                const date = new Date().getTime().toString();

                if (props.onMultipleChange) {
                    let value: FileUploadType[] = acceptedFiles.map((file, index) => ({
                        src: URL.createObjectURL(file),
                        file: file,
                        id: `${date}-${index}`
                    }));
                    if (Array.isArray(field.value))
                        value = [...value, ...field.value];
                    helpers.setValue(value);
                    props.onMultipleChange(value);
                } else if (acceptedFiles.length > 0) {
                    const value = {
                        src: URL.createObjectURL(acceptedFiles[0]),
                        file: acceptedFiles[0],
                        id: date
                    };
                    helpers.setValue(value);
                    if (props.onChange)
                        props.onChange(value);
                }
            }
        },
        [props.onChange, field.value]
    );

    const handleDeleteImage = (img: FileUploadType) => {
        if (field.value)
            if (Array.isArray(field.value)) {
                helpers.setValue(field.value.filter(i => i.id !== img.id));
            } else {
                helpers.setValue(null);
            }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: handleDrop
    });


    return (
        <FormikFieldWrapper
            xs={xs}
            md={md}
            lg={lg}
            gridClassName={gridClassName}
        >
            <Box
                sx={
                    [classes.dropZone, isDragActive && classes.dragActive,
                        (meta.error && meta.touched) ? {border: theme => `1px dashed ${theme.palette.error.main}`,} : {}]
                }

                {
                    // @ts-ignore
                    ...getRootProps()
                }
            >
                <input {...getInputProps()} />
                <Box component={'div'} textAlign={'center'} zIndex={4} position={'relative'}>
                    <React.Fragment>
                        {props.label &&
                            <Typography variant="body1" gutterBottom color={'common.black'} fontSize={'14px'}
                                        fontWeight={'700'}>
                                {props.label}
                            </Typography>}
                        <Typography color={'primary'} fontSize={'14px'}
                                    sx={{mx: '10px'}}>
                            {props.onMultipleChange ? 'Choisir une ou plusieurs images' : 'Choisir une image'}
                            <Typography variant={'caption'} color={'text.disabled'}>
                                (JPEG, PNG, WEBP, AVIF)
                            </Typography>
                        </Typography>
                    </React.Fragment>
                </Box>
            </Box>
            {
                meta.touched && meta.error &&
                <FormHelperText error sx={{my: 1}}>
                    {meta.error}
                </FormHelperText>
            }
            <Box sx={classes.imgContainer}>
                {
                    field.value && (Array.isArray(field.value) ? field.value : [
                        field.value
                    ]).map(img => <Box sx={classes.imgItem} key={img.id}>
                        <img src={img.src} alt=""/>
                        <Box
                            onClick={() => handleDeleteImage(img)}
                            color={'error'}
                            sx={[classes.action]}
                        >
                            <img
                                src={'/icons/close.svg'}
                            />
                        </Box>
                    </Box>)
                }
            </Box>
        </FormikFieldWrapper>
    );
}

