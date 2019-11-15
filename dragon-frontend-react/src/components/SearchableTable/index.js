import React from 'react';
import { Table, Button, Input, Icon } from 'antd';
import { withTranslation } from 'react-i18next';
import * as style from './style';

class SearchableTable extends React.Component {
    state = { searchText: '' }

    renderInput = ({ setSelectedKeys, selectedKeys, confirm }, dataIndex) => (
        <Input
            ref={node => this.searchInput = node}
            placeholder={`${this.props.t('table.search')} ${this.props.getColumnName(dataIndex)}`}
            value={selectedKeys[0]}
            onChange={e => { setSelectedKeys(e.target.value ? [e.target.value] : []) }}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={style.filterInput} />
    )

    renderSearchButton = ({ selectedKeys, confirm }) => (
        <Button
            type="primary" icon="search" size="small"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            style={style.filterSearchButton}>
            {this.props.t('table.search')}
        </Button>
    )

    renderResetButton = ({ clearFilters }) => (
        <Button
            size="small"
            onClick={() => this.handleReset(clearFilters)}
            style={style.filterResetButton}>
            {this.props.t('table.reset-search')}
        </Button>
    )

    getColumnSearchProps = dataIndex => ({
        filterDropdown: (params) => (
            <div style={style.filterDropdown}>
                {this.renderInput(params, dataIndex)}
                {this.renderSearchButton(params)}
                {this.renderResetButton(params)}
            </div>
        ),
        filterIcon: filtered => (<Icon type="search" style={style.filterIcon(filtered)}/>),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => visible && setTimeout(() => this.searchInput.select()),
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
                style={style.table} />
        )
    }
}

export default withTranslation()(SearchableTable)