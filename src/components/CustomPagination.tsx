import { Pagination, Stack, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
interface ICustomPaginationProps {
    pageQty: number;
    pageNumber: number;
    setPageNumber: (value: number) => void;
}
const CustomPagination = ({
    pageQty,
    pageNumber,
    setPageNumber,
}: ICustomPaginationProps) => {
    return (
        <div className="container">
            <Stack alignItems="center" mt={4}>
                {pageQty && (
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        siblingCount={0}
                        count={pageQty}
                        page={pageNumber}
                        onChange={(_, num) => setPageNumber(num)}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/?page=${item.page}`}
                                {...item}
                            />
                        )}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#ccc", // цвет неактивных номеров
                                borderRadius: 0,
                                margin: "0 8px",
                                border: "1px solid #fff3",
                                "@media (hover: hover) and (pointer: fine)": {
                                    "&:hover": {
                                        backgroundColor: "#fff3", // цвет фона при ховере
                                    },
                                },
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "#fff3 !important", // цвет активного номера
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                border: "none",
                            },
                        }}
                    />
                )}
            </Stack>
        </div>
    );
};

export default CustomPagination;
