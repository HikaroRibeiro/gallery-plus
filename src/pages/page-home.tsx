
import Container from "../components/container";
import PhotoWidget from "../contexts/photos/components/photo-widget";
import type { Photo } from "../contexts/photos/models/photo";

export default function PageHome() {
    return (
        <Container>
            <div className="grid grid-cols-4 gap-9">
                <PhotoWidget photo={
                        {
                            id: "123",
                            title: "Ola mundo",
                            imageId: "portrait-tower.png",
                            createdAt: new Date(),
                            albums: [
                                {
                                    id: "123",
                                    title: "Album 1",
                                    createdAt: new Date(),
                                },{
                                    id: "124",
                                    title: "Album 2",
                                    createdAt: new Date(),
                                },{
                                    id: "125",
                                    title: "Album 3",
                                    createdAt: new Date(),
                                }
                            ]
                        }
                    } 
                />
                <PhotoWidget photo={
                        {
                            id: "124",
                            title: "Ola mundo",
                            imageId: "portrait-tower.png",
                            createdAt: new Date(),
                            albums: [
                                {
                                    id: "123",
                                    title: "Album 1",
                                    createdAt: new Date(),
                                },{
                                    id: "124",
                                    title: "Album 2",
                                    createdAt: new Date(),
                                },{
                                    id: "125",
                                    title: "Album 3",
                                    createdAt: new Date(),
                                }
                            ]
                        }
                    } 
                />
                <PhotoWidget photo={{} as Photo} loading />
            </div>
        </Container>
    )
}