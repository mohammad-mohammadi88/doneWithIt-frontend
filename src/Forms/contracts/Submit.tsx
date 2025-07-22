import { Button } from "@/Components/AppComponents";
import type { FC } from "react";

interface Props {
    title: string;
}

const Submit: FC<Props> = ({ title }) => {
    return <Button type="submit" className="bg-secondary mt-3 text-white">{title}</Button>;
};

export default Submit;
