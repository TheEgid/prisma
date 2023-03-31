import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { prisma } from "tools/db";

type Props = {
    feed: PostProps[];
};

const MainPage: React.FC<Props> = (props) => {
    return (
        <Layout>
            <Box className="page" pt={5}>
                <Heading>Public Feed </Heading>
                <VStack mt={5} spacing={5}>
                    {props.feed.map((post) => (
                        <Box key={post.id} w="full" shadow="lg" _active={{ shadow: "unset" }}>
                            <Post post={post} />
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const currentFeed = await prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
    return {
        props: { feed: currentFeed },
    };
};

export default MainPage;
