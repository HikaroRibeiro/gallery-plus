import { Link } from "react-router";
import Container from "./container";
import cx from "classnames";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import Button from "./button";
import PhotosSearch from "./photos-search";
import Divider from "./divider";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {

}

export default function MainHeader({className, ...props}: MainHeaderProps) {
    return (
        <Container as="header" className={cx("flex justify-between items-center gap-10", className)} {...props}>
            <Link to="/" className="h-5">
                <Logo className="h-5" />
            </Link>

            <PhotosSearch />
            <Divider orientation="vertical" className="h-10" />

            <div className="flex items-center gap-3">
                <Button>Nova foto</Button>
                <Button variant="secondary">Criar album</Button>
            </div>
        </Container>
    )
}