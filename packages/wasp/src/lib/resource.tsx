import { TableOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { TableProps, ColumnsType } from 'antd/es/table';
import { useMemo, useState, Fragment, useEffect } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Col, Row, Table, Space, Button, Divider, Popover, Checkbox } from 'antd';

export interface PropertyFilterProps {
    columns: ColumnsType<any>;
    onChange: (columns: ColumnsType<any>) => void;
}

const PropertyFilter = (props: PropertyFilterProps) => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [value, setValue] = useState<CheckboxValueType[]>([]);

    const options = useMemo(() => {
        return (props.columns as any[]).map((column) => {
            return {
                value: column.key,
                label: column?.title,
            };
        });
    }, [props.columns]);

    useEffect(() => {
        const columns = (props.columns as any[]).filter((column) => {
            return value.includes(column.key);
        });

        props.onChange(columns);
    }, [value]);

    useEffect(() => {
        setChecked(true);
        setValue(options.map(({ value }) => value));
    }, []);

    const onChange = (event: CheckboxChangeEvent) => {
        setIndeterminate(false);
        setChecked(event.target.checked);
        setValue(event.target.checked ? options.map(({ value }) => value) : []);
    };

    const onSelect = (selected: CheckboxValueType[]) => {
        setValue(selected);
        setChecked(selected.length === options.length);
        setIndeterminate(!!selected.length && selected.length < options.length);
    };

    const content = (
        <Fragment>
            <Checkbox indeterminate={indeterminate} onChange={onChange} checked={checked}>
                ALL
            </Checkbox>

            <Divider />

            <Checkbox.Group value={value} onChange={onSelect}>
                <Space direction="vertical">
                    {options.map((option, index) => {
                        return (
                            <Checkbox key={`${option.value}#${index}`} value={option.value}>
                                {option.label}
                            </Checkbox>
                        );
                    })}
                </Space>
            </Checkbox.Group>
        </Fragment>
    );

    return (
        <Popover content={content} trigger="click" placement="bottomRight">
            <Button type="primary" icon={<TableOutlined />}>
                COLUMNS
            </Button>
        </Popover>
    );
};

const Resource = (props: TableProps<any>) => {
    const [columns, setColumns] = useState(props?.columns || []);

    return (
        <Space size="large" direction="vertical" style={{ width: '100%' }}>
            <Row align="middle" justify="end">
                <Col>
                    <PropertyFilter columns={props?.columns || []} onChange={(columns) => setColumns(columns)} />
                </Col>
            </Row>

            <Table {...{ ...props, columns }} />
        </Space>
    );
};

export default Resource;
