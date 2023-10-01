import { Search } from "@mui/icons-material";


interface Props {
    boxId? : string,
    inputId? : string,
    onChange? : React.ChangeEventHandler<HTMLInputElement>
}


export default function SearchBox({boxId = undefined, inputId = undefined, onChange = undefined} : Props) {

    return (
        <div className="ml-20 bg-searchBg h-[40px] px-2 md:flex items-center rounded-md overflow-hidden sm:hidden" id={boxId}>
            <Search className="text-gray-400" />
            <input id={inputId} type="text" placeholder="Search..."
                className="w-full h-full bg-transparent outline-none
                border-none text-textColor placeholder-gray-400 px-2"
                onChange={onChange}
            />
        </div>
    )
}