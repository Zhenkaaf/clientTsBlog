import { Pagination, Stack } from "@mui/material";
interface ICustomPaginationProps {
    pageQty: number;
    page: number;
    setPage: (value: number) => void;
}
const CustomPagination = ({
    pageQty,
    page,
    setPage,
}: ICustomPaginationProps) => {
    return (
        <div className="container">
            <Stack alignItems="center" mt={4}>
                {pageQty && (
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={pageQty}
                        page={page}
                        onChange={(_, num) => setPage(num)}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#ccc", // цвет неактивных номеров
                                borderRadius: 0,
                                border: "1px solid #fff3",
                                "&:hover": {
                                    backgroundColor: "#fff3", // цвет фона при ховере
                                },
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "#fff3", // цвет активного номера
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#333",
                            },
                        }}
                    />
                )}
            </Stack>
        </div>
    );
};

export default CustomPagination;
