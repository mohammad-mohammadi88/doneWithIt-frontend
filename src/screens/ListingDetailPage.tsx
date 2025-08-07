import { redirect } from "next/navigation";
import { lazy, type FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import { LocationMapWrapper, PageHeading, ViewImageComponent } from "@Client";
import { serverListing, serverToken, serverUser } from "@/APIs/server";
import { ErrorMessage } from "@AppComponents";
import { capitalize } from "@/utilities";

interface Props { params: Promise<{ id: string }> }

const ListingDetailPage: FC<Props> = async ({ params }) => {
    const listingId = (await params).id;
    const ListingMessage = lazy(
        () => import("@/Components/client/ListingMessage")
    );
    const { body, ok } = await serverListing.getListing(listingId);
    if (!ok)
        return (
            <ErrorMessage
                className={clsx(
                    "h-screen w-screen flex justify-center items-center",
                    "md:text-3xl lg:text-4xl xl:text-5xl"
                )}
                title={body?.error ?? "Could not load this listing!"}
            />
        );
    const {
        description,
        id,
        images,
        isSold,
        latitude,
        longitude,
        price,
        title,
        userId,
    } = body;
    if (isSold) redirect("/feed");

    const user = await serverUser.getServerUser(userId);

    const me = await serverToken.getUserWithToken();

    const isMyListing = user.ok && me?.userId === user.body.id;
    return (
        <main>
            <PageHeading title={title} />
            <div className='container lg:px-15 flex flex-wrap md:mt-5 pb-5 mx-auto'>
                <ViewImageComponent
                    className='md:w-1/2 md:h-full'
                    images={images.map((e) => e.url)}
                >
                    <Image
                        alt={title + " image"}
                        className='h-63 w-full md:h-96'
                        height={500}
                        src={images[0].url}
                        width={500}
                    />
                </ViewImageComponent>
                <section className='px-5 w-full mt-5 md:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-2.5'>
                        {capitalize(title)}
                    </h1>
                    <h2 className='text-lg text-primary font-bold'>${price}</h2>
                    {description && (
                        <p className='text-base mt-2.5'>{description}</p>
                    )}
                    {!user.ok ? (
                        <ErrorMessage
                            className='mt-5'
                            title={
                                user.body?.error ??
                                "Could not load listing user info!"
                            }
                        />
                    ) : (
                        <ListingMessage
                            isMyListing={isMyListing}
                            listings={user.body.listings}
                            listingId={id}
                            name={user.body.name}
                            userId={user.body.id}
                        />
                    )}
                </section>

                {longitude && latitude && (
                    <LocationMapWrapper
                        longitude={longitude}
                        latitude={latitude}
                    />
                )}
            </div>
        </main>
    );
};

export default ListingDetailPage;
