import { AgGridReact } from 'ag-grid-react';
import { dataAdvanced, type DataAdvanced } from '@porsche-design-system/shared';
import 'ag-grid-community';
import { ColDef } from 'ag-grid-community';
import '@porsche-design-system/components-react/ag-grid/theme-pds.css';
import { PLinkPure, Theme } from '@porsche-design-system/components-react';

type ColumnDefs = DataAdvanced & {
  active: boolean;
};

const theme: Theme = 'light';

const ImageUrlRendererer = ({ value }: { value: string }) => {
  return (
    <span
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={value}
        style={{
          objectFit: 'contain',
        }}
        width="80"
        height="45"
        alt=""
      />
    </span>
  );
};

const ButtonRenderer = ({ data }: { data: any }) => {
  return (
    <span
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <PLinkPure
        underline={true}
        theme={theme}
        target="_blank"
        href={'https://www.porsche.com/germany/models/' + data.model.toLowerCase()}
      >
        More information
      </PLinkPure>
    </span>
  );
};

const rowData = dataAdvanced.map((row, index) => ({ active: Boolean(index % 2) /* odd rows */, ...row }));

const columnDefs: ColDef<ColumnDefs>[] = [
  {
    field: 'active',
    showDisabledCheckboxes: true,
    width: 170,
  },
  {
    field: 'imageUrl',
    headerName: 'Image',
    cellRenderer: ImageUrlRendererer,
    editable: false,
    filter: false,
    sortable: false,
    width: 130,
  },
  {
    field: 'model',
    editable: false,
  },
  {
    field: 'date',
    editable: false,
  },
  {
    field: 'interest',
    editable: false,
  },
  {
    field: 'vin',
    width: 250,
    editable: false,
  },
  {
    field: 'purchaseIntention',
    editable: false,
  },
  {
    field: 'status',
    editable: false,
  },
  {
    field: 'comment',
    filter: false,
    width: 500,
  },
  {
    field: 'leadId',
    headerName: 'More',
    cellRenderer: ButtonRenderer,
    editable: false,
    sortable: false,
    filter: false,
  },
];

// Configurations applied to all columns
const defaultColDef = {
  filter: true,
  editable: true,
};

export const AGGridExampleStorefrontPage = (): JSX.Element => {
  return (
    <div className={theme === 'light' ? 'ag-theme-pds' : 'ag-theme-pds-dark'} style={{ height: '100vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        enableRangeSelection={true}
      />
    </div>
  );
};
