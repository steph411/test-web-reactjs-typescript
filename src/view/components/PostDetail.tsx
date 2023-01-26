import React, {useState} from 'react';
import {Article, PostComment} from "../types";
import {Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography} from "@mui/material";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import {ReactSVG} from "react-svg";
import SecureLS from "secure-ls";
import DialogConfirm from "./DialogConfirm";
import {useSnackbar} from "notistack";

moment.locale("fr");
const ls = new SecureLS({encodingType: 'aes'});


interface ArticleDetailProps {
    open: boolean;
    onClose: () => void;
    dataId: string;
}


const ArticleDetail = (props: ArticleDetailProps) => {
        const {open, onClose, dataId} = props;
        const initialData = (ls.get("articles") || [] as Article[]).find((article: Article) => article.id === dataId);
        const {enqueueSnackbar} = useSnackbar();
        const [data, setData] = useState(initialData);
        const [comment, setComment] = useState("");
        const [commentToEdit, setCommentToEdit] = useState<{ id: string, value: string } | null>(null);
        const [commentToDelete, setCommentToDelete] = useState<string | undefined>(undefined);
        const handleAddComment = () => {
            const newComment: PostComment = {
                id: uuidv4(),
                content: comment,
                date: new Date()
            };
            const newArticles = ls.get("articles") || [] as Article[];
            const index = newArticles.findIndex((item: Article) => item.id === data.id);
            if (index != -1) {
                newArticles[index].comments.push(newComment);
                setData(newArticles[index]);
            }

            ls.set("articles", newArticles);
            setComment("");
        };

        const handleUpdateComment = () => {
            const newArticles = ls.get("articles") || [] as Article[];
            const index = newArticles.findIndex((item: Article) => item.id === data.id);
            if (index != -1) {
                const commentIndex = newArticles[index].comments.findIndex((comment: PostComment) => comment.id === commentToEdit?.id);
                if (commentIndex != -1) {
                    newArticles[index].comments[commentIndex].content = commentToEdit?.value || "";
                    setData(newArticles[index]);
                }
            }
            ls.set("articles", newArticles);
            enqueueSnackbar("Commentaire mis à jour", {variant: "success"});
            setCommentToEdit(null);
        }

        const handleDeleteComment = () => {
            const newArticles = ls.get("articles") || [] as Article[];
            const index = newArticles.findIndex((item: Article) => item.id === data.id);
            if (index != -1) {
                const commentIndex = newArticles[index].comments.findIndex((comment: PostComment) => comment.id === commentToDelete);
                if (commentIndex != -1) {
                    newArticles[index].comments.splice(commentIndex, 1);
                    setData(newArticles[index]);
                }
            }
            ls.set("articles", newArticles);
            enqueueSnackbar("Commentaire supprimé", {variant: "success"});
            setCommentToDelete(undefined);
        }

        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth={"sm"}
            >
                {
                    commentToDelete &&
                    <DialogConfirm
                        title={"Confirmer l'action"}
                        open={!!commentToDelete}
                        onConfirmDialogClose={() => setCommentToDelete(undefined)}
                        text={"Voulez vous vraiment supprimer ce commentaire ?"}
                        onYesClick={() => handleDeleteComment()}
                        confirmBtnText={"Confirmer"}
                    />
                }
                <DialogTitle>

                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"h3"}>
                            Détails du post
                        </Typography>
                        <Box
                            sx={{
                                cursor: "pointer"
                            }}
                            onClick={() => onClose()}
                        >
                            <ReactSVG
                                src={"/icons/close.svg"}
                            />
                        </Box>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography
                            variant={"h4"}
                            align={"center"}
                            sx={{mb: 2}}
                        >
                            {data.title}
                        </Typography>
                        <Box
                            sx={{
                                mb: 1,
                                "& img": {
                                    width: "100%"
                                }
                            }}
                        >
                            <img src={data.image} alt=""/>
                        </Box>
                        <Typography
                            variant={"body1"}
                            sx={{mb: 2}}
                        >
                            {data.content}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant={"h5"}
                            sx={{mb: 2}}
                        >
                            Commentaires ({data.comments.length})
                        </Typography>
                        <Box
                            className={"comments"}
                        >
                            {
                                data.comments.map((item: PostComment) => (
                                    <Box

                                        key={item.id}
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            border: "1px solid #ccc",
                                            borderRadius: 4
                                        }}
                                    >
                                        {
                                            commentToEdit?.id == item.id ? (
                                                <Stack direction={"row"} gap={"20px"} width={"100%"}>
                                                    <TextField
                                                        variant={"outlined"}
                                                        fullWidth
                                                        value={commentToEdit.value}
                                                        onChange={(e) => {
                                                            setCommentToEdit({
                                                                    id: commentToEdit?.id ?? "",
                                                                    value: e.target.value
                                                                }
                                                            )
                                                        }}
                                                    />
                                                    <Button
                                                        variant={"outlined"}
                                                        disabled={!commentToEdit.value}
                                                        onClick={() => {
                                                            handleUpdateComment();
                                                        }}
                                                        color={"primary"}
                                                        sx={{
                                                            "& >div>div": {
                                                                display: "flex"
                                                            }
                                                        }}
                                                    >
                                                        <ReactSVG
                                                            src={"/icons/send.svg"}
                                                        />
                                                    </Button>
                                                </Stack>

                                            ) : (
                                                <Typography
                                                    variant={"body1"}
                                                    sx={{mb: 1}}
                                                    className={"comment-content"}
                                                >
                                                    {item.content}
                                                </Typography>
                                            )
                                        }

                                        <Typography
                                            variant={"caption"}
                                        >
                                            {moment(item.date).fromNow()}
                                        </Typography>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"end"}
                                            alignItems={"center"}
                                            gap={1}
                                        >
                                            <Button
                                                variant={"text"}
                                                color={"info"}
                                                onClick={() => {
                                                    setCommentToEdit({
                                                        id: item.id,
                                                        value: item.content
                                                    })
                                                }}
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                variant={"text"}
                                                color={"error"}
                                                onClick={() => {
                                                    setCommentToDelete(item.id)
                                                }}
                                            >
                                                Supprimer
                                            </Button>
                                        </Stack>
                                    </Box>
                                ))
                            }
                        </Box>

                    </Box>
                    <Box sx={{
                        mt: 2,
                    }}>
                        <Stack direction={"row"} gap={"20px"} width={"100%"}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                label={"Commentaire"}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                id={"comment_input"}
                            />
                            <Button
                                id={"add_comment_btn"}
                                variant={"outlined"}
                                disabled={!comment}
                                onClick={() => {
                                    handleAddComment();
                                }}
                                color={"primary"}
                                sx={{
                                    "& >div>div": {
                                        display: "flex"
                                    }
                                }}
                            >
                                <ReactSVG
                                    src={"/icons/send.svg"}
                                />
                            </Button>
                        </Stack>
                    </Box>
                </DialogContent>

            </Dialog>
        );
    }
;

export default ArticleDetail