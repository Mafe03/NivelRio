import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name',  'country','isAdmin'];

const Inicio = () => {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );

  return (
    <>
      <div className="container-fluid py-4">
      <div className="row">
     
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-4 pb-3 mt-2 ">
                  <h6 className="text-white text-capitalize ps-3">Mínimo</h6>
                </div>
                <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-4 pb-3 mt-2">
                  <h6 className="text-white text-capitalize ps-3">Máximo</h6>
                </div>
                <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-4 pb-3 mt-2">
                  <h6 className="text-white text-capitalize ps-3">Promedio</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
              <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        {...data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
              </div>
            </div>
          </div>
        </div>
        
        </div>
        <footer className="footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © {new Date().getFullYear()}, Emcartago{" "}
                <i className="fa fa-heart"></i> {" "}
                Niveles del Río.
              </div>
            </div>
           
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Inicio;
