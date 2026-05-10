import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photo";
import { fetcher } from "../../../helpers/api";

interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
    const {data, isLoading} = useQuery<PhotoDetailResponse>({
        queryKey: ["photo", id],
        queryFn: () => fetcher(`/photos/${id}`),
        // Verifica se existe o valor, se existir assume true, caso contrário false.
        enabled: !!id
    })

    return {
        photo: data,
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        isLoadingPhoto: isLoading,
    }
}