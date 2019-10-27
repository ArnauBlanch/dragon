import React from 'react';
import { Table, Button, Input, Icon } from 'antd';
import { withTranslation } from 'react-i18next';

class SearchableTable extends React.Component {
    state = { searchText: '' }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => this.searchInput = node}
                    placeholder={`${this.props.t('table.search')} ${this.props.getColumnName(dataIndex)}`}
                    value={selectedKeys[0]}
                    onChange={e => { setSelectedKeys(e.target.value ? [e.target.value] : []) }}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}/>
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}>
                    {this.props.t('table.search')}
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small" style={{ width: 90 }}>
                    {this.props.t('table.reset-search')}
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible)
                setTimeout(() => this.searchInput.select())
        },
        render: text => text
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({ searchText: selectedKeys[0] })
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }

    render() {
        const columnsToRender = this.props.columns
            .map(x => ({ ...x, ...(x.searchable && this.getColumnSearchProps(x.dataIndex)) }))

        return (
            <Table
                {...this.props}
                columns={columnsToRender}
                style={{ height: '100%' }} />
        )
    }
}

export default withTranslation()(SearchableTable)