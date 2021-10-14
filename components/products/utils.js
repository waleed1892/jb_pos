export const productColumns = [
    {
        header: 'Name (EN)',
        accessor: 'name_en'
    },
    {
        header: 'Name (AR)',
        accessor: 'name_ar'
    },
    {
        header: 'Variations',
        accessor: 'variations',
        cell: (row) => row.variations.length
    }
]
