# @zanake/bee

An [Ant Design](https://ant.design/) package that bulds on top Ant Design React components to provide "plug and play" components for enterprise projects.

> **bee** . _noun_
>
> : a winged insects closely related to ants, known for their roles in pollination and best-known for producing honey

<br>

## Install

Install the package from the NPM registry using the command below:

`npm install @zanake/bee`

<br>

## Components

### `<Resource/>`

A fast and extendable React data table. It's a feature-rich component with:

-   Sorting
-   Filtering
-   Pagination
-   Aggregation
-   Row selection
-   Column hiding
-   Column grouping
-   Expandable rows
-   CSV & Excel Export

| Prop         | Type                                                                                                          | Description                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| size         | `large \| middle \| small`                                                                                    | Size of table: controls how visually compact the table data feels                                        |
| loading      | ` boolean`                                                                                                    | Loading status of table: decides whether the loading animation is visible                                |
| columns      | `ColumnsType[]`                                                                                               | [Schema](https://ant.design/components/table#column): controls the visual aspect of the fields displayed |
| onChange     | 𝑓 (`pagination`, `filters`, `sorter`, `extra: { currentDataSource: [], action: paginate \| sort \| filter }`) | A callback that is executed when pagination, filters or sorters are triggered                            |
| bordered     | ` boolean`                                                                                                    | Whether to show all table borders                                                                        |
| dataSource   | `array<object>`                                                                                               | Data record array to be displayed                                                                        |
| pagination   |                                                                                                               |                                                                                                          |
| rowSelection |                                                                                                               |                                                                                                          |

<br>

> Powered By [Nx](https://nx.dev)
