import ImagePreview from "../../../components/image-preview";
import Skeleton from "../../../components/skeleton";
import type { Photo } from "../models/photo";
import Text from "../../../components/text";
import Badge from "../../../components/badge";
import { buttonTextVariants, buttonVariants } from "../../../components/button";
import { Link } from "react-router";

interface PhotoWidgetProps {
    photo: Photo;
    loading?: boolean;
}

export default function PhotoWidget({photo, loading = false}: PhotoWidgetProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {!loading ? (
                    <ImagePreview 
                        src={`/images/${photo.imageId}`} 
                        alt={photo.title} 
                        title={photo.title} 
                        imageClassName="w-[13.5625rem] h-[13.5625rem] rounded-lg" />
                ) : (
                    <Skeleton className="w-[13.5625rem] h-[13.5625rem] rounded-lg"/>
                )}

                <div className="flex flex-col gap-2">
                    {!loading ? (
                        <Text variant="paragraph-large" className="truncate">{photo.title}</Text>
                    ) : (
                        <Skeleton className="w-full h-6"/>
                    )}
                </div>

                <div className="flex gap-1 min-h-[1.375rem]">
                    {!loading ? (
                        <>
                            {photo.albums.slice(0, 2).map(album => (
                                <Badge className="truncate" size="xs" key={album.id}>
                                    {album.title}
                                </Badge>
                            ))}
                            {photo.albums.length > 2 && <Badge size="xs">+{photo.albums.length - 2}</Badge>}

                        </>
                    ) : (
                        Array.from({length: 2}).map((_, index) => (
                            <Skeleton className="w-full h-4 rounded-sm" key={`album-loading-${index}`}/>
                        ))
                    )}

                </div>
            </div>
            {!loading ? (
                <Link 
                to={`/photos/${photo.id}`}
                className={buttonVariants({
                    variant: "secondary",
                    className: "px-2 py-2"
                })}>
                    <Text className={buttonTextVariants({variant: "secondary", size: "sm"})}>
                        Criado em {photo.createdAt.toLocaleDateString()}
                    </Text>
                </Link>
            ) : (
                <Skeleton className="w-full h-10"/>
            )}
        </div>
    )
}