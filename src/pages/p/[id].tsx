import React from "react";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { NextRouter, useRouter } from "next/router";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import { prisma } from "tools/db";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(params?.id) || -1,
        },
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
    });
    return {
        props: post,
    } as GetServerSidePropsResult<{ [key: string]: any }>;
};

async function publishPost(id: number, router: NextRouter): Promise<void> {
    await fetch(`/api/publish/${id}`, {
        method: "PUT",
    });
    await router.push("/");
}

async function deletePost(id: number, router: NextRouter): Promise<void> {
    await fetch(`/api/post/${id}`, {
        method: "DELETE",
    });
    await router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
    const router = useRouter();

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === props.author?.email;
    let title = props.title;
    if (!props.published) {
        title = `${title} (Draft)`;
    }

    return (
        <Layout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || "Unknown author"}</p>
                <ReactMarkdown>{props.content}</ReactMarkdown>
                {!props.published && userHasValidSession && postBelongsToUser && (
                    <button onClick={() => publishPost(props.id, router)}>Publish</button>
                )}
                {userHasValidSession && postBelongsToUser && (
                    <button onClick={() => deletePost(props.id, router)}>Delete</button>
                )}
            </div>
            <style>{`
                .page {
                    background: white;
                    padding: 2rem;
                }

                .actions {
                    margin-top: 2rem;
                }

                button {
                    background: #ececec;
                    border: 0;
                    border-radius: 0.125rem;
                    padding: 1rem 2rem;
                }

                button + button {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default Post;
