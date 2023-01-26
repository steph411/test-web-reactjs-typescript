import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import {Article} from "./types";
import AddPostForm from "./components/AddPostForm";
import SecureLS from "secure-ls";
import {v4 as uuidv4} from 'uuid';
import {trimText} from "../utils/text";
import ArticleDetail from "./components/PostDetail";
import PostSkeleton from "./components/PostSkeleton";
import {ReactSVG} from "react-svg";

const ls = new SecureLS({encodingType: 'aes'});
const HomePage = () => {
    // get from local storage
    const [articles, setArticles] = useState<Article[]>(ls.get('articles') || []);
    const [openForm, setOpenForm] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string | undefined>(undefined);

    const handleAddPost = (article: Article) => {
        setArticles([...articles, article]);
        ls.set('articles', [...articles, article]);
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <Container
            maxWidth={"lg"}
            sx={{
                pt: 4
            }}
        >
            {
                selectedPost &&
                <ArticleDetail
                    open={!!selectedPost}
                    onClose={() => setSelectedPost(undefined)}
                    dataId={selectedPost}
                />
            }
            {
                openForm &&
                <AddPostForm
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    onSubmit={(article) => {
                        const data: any = {
                            id: uuidv4(),
                            ...article,
                            comments: [] as Comment[]
                        };
                        handleAddPost(data);
                    }}
                />
            }
            <Typography
                variant="h1"
                align={"center"}
            >
                test-web-reactjs-typescript
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
                {
                    loading ? <div/> : <Typography
                        variant={"h3"}
                    >
                        Tous les posts ({articles.length})
                    </Typography>
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenForm(true)}
                >
                    Ajouter
                </Button>
            </Stack>
            <Box mt={4}>
                {
                    loading ? (
                        <Grid container spacing={2} alignItems={"stretch"}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <PostSkeleton/>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    ) : (
                        <Box>
                            {
                                articles.length > 0 ? (
                                    <Grid container spacing={2} alignItems={"stretch"}>
                                        {
                                            articles.map((item) => (
                                                <Grid
                                                    key={item.id}
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                >
                                                    <Box
                                                        className={"post"}
                                                        onClick={() => setSelectedPost(item.id)}
                                                        sx={{
                                                            cursor: "pointer",
                                                            "& img": {
                                                                width: "100%",
                                                                objectFit: "cover"
                                                            }
                                                        }}
                                                    >
                                                        <img src={item.image} alt={item.title}/>
                                                        <Typography
                                                            variant={"h5"}
                                                            textAlign={"left"}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                        <Typography
                                                            variant={"body1"}
                                                            textAlign={"left"}
                                                        >
                                                            {trimText(item.content, 120)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            height: "calc(100vh - 200px)",
                                            "& svg": {
                                                height: 200
                                            }
                                        }}
                                    >
                                        <ReactSVG
                                            src={"/icons/empty.svg"}
                                        />

                                        <Typography
                                            variant={"h4"}
                                            align={"center"}
                                            sx={{
                                                mt: 2
                                            }}
                                        >
                                            Aucun post pour le moment <br/>
                                            Ajoutez un post pour commencer
                                        </Typography>
                                    </Box>
                                )
                            }

                        </Box>
                    )
                }

            </Box>
        </Container>
    )
}

export default HomePage