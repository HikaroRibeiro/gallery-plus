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
                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`} 
                        alt={photo.title} 
                        title={photo.title} 
                        imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg" />
                ) : (
                    <Skeleton className="w-43.5 h-43.5 rounded-lg"/>
                )}

                <div className="flex flex-col gap-2">
                    {!loading ? (
                        <Text variant="paragraph-large" className="truncate">{photo.title}</Text>
                    ) : (
                        <Skeleton className="w-full h-6"/>
                    )}
                </div>

                <div className="flex gap-1 min-h-5.5">
                    {!loading ? (
                        <>
                            {photo.albums.slice(0, 1).map(album => (
                                <Badge className="truncate" size="xs" key={album.id}>
                                    {album.title}
                                </Badge>
                            ))}
                            {photo.albums.length > 1 && <Badge size="xs">+{photo.albums.length - 2}</Badge>}

                        </>
                    ) : (
                        Array.from({length: 1}).map((_, index) => (
                            <Skeleton className="w-full h-4 rounded-sm" key={`album-loading-${index}`}/>
                        ))
                    )}

                </div>
            </div>
            {!loading ? (
                <Link 
                to={`/fotos/${photo.id}`}
                className={buttonVariants({
                    variant: "secondary",
                    className: "px-2 py-2"
                })}>
                    <Text className={buttonTextVariants({variant: "secondary", size: "sm"})}>
                        Details: {photo.title}
                    </Text>
                </Link>
            ) : (
                <Skeleton className="w-full h-10"/>
            )}
        </div>
    )
}