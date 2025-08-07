import type { FC } from "react";

interface Props { progress: number }

const Progress: FC<Props> = ({ progress }) => (
    <div className="w-80 rounded-2xl border h-2.5 relative">
        <div className="bg-secondary rounded-2xl h-2 left-0" style={{ width: `${progress * 100}%` }} />
    </div>
)

export default Progress