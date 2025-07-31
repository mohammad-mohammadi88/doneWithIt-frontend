import { Button } from "@AppComponents";
import type { FC } from "react";

interface Props {
    title: string;
}

const Submit: FC<Props> = ({ title }) => (
    <Button type='submit' className='bg-secondary mt-1 text-white'>
        {title}
    </Button>
);

export default Submit;
