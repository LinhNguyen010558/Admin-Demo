import React, { memo, useEffect, useState } from 'react'
import { Table } from 'antd'
import { useIntl } from 'react-intl'

export const TableComponent = ({
    className,
    style,
    limit,
    columns,
    onTableChange,
    count,
    page,
    loading,
    data,
    heightTable = 'auto',
    widthTable = 'auto',
    keys = 'id',
    expandedRowRender,
    onExpandedRowsChange
}) => {
    const intl = useIntl()
    const [currentPage, setCurrentPage] = useState(1)
    const onChangePage = (page, pageSize) => {
        setCurrentPage(page)
    }
    const objKeys = Object.keys(data && data.length > 0 ? data[0] : {})
    const index = objKeys.findIndex((v) => v.toLowerCase().includes(keys))
    useEffect(() => {
        if (page === 1) {
            setCurrentPage(1)
        } else if (page && page !== currentPage) setCurrentPage(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <Table
            rowKey={index > -1 ? objKeys[index] : ''}
            className={className}
            style={style}
            scroll={{ x: widthTable, y: heightTable }}
            loading={loading}
            // bordered
            /* @ts-ignore */
            columns={columns}
            locale={{
                // emptyText: intl.formatMessage({ id: 'sidebar.users.no_data' }),
                emptyText: intl.formatMessage({id: 'label.Empty'})
            }}
            bordered
            expandIconAsCell={false}
            onExpandedRowsChange={onExpandedRowsChange}
            expandedRowRender={expandedRowRender}
            dataSource={data}
            pagination={{
                pageSize: limit,
                showSizeChanger: true,
                defaultCurrent: page,
                current: currentPage,
                defaultPageSize: limit,
                position: ['bottomRight'],
                total: count,
                onChange: onChangePage,
                /* @ts-ignore */
                pageSizeOptions: [10, 30, 50, 100],
                // showQuickJumper: true,
                showTotal: (total, range) => {
                    return (
                        <span className="gFontSize">
                            {' '}
                            {"Total"} {count}{' '}
                            {"Items"}
                        </span>
                    )
                },
            }}
            onChange={(pagination) => onTableChange(pagination)}
        />
    )
}
export default memo(TableComponent)
