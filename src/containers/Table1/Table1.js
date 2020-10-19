import React            from 'react';
import Grid             from '@material-ui/core/Grid';
import { keys, values } from 'lodash';
import generateRows     from '../../components/generate_rows';
import countries        from '../../components/countries';
import Table            from '../../components/Table';

const cols = [
  {
    property: 'name',
    header: {
      label: 'Name',
      props: {
        style: {
          width: 200
        }
      }
    },
  },
  {
    property: 'position',
    header: {
      label: 'Position',
      props: {
        style: {
          width: 100
        }
      }
    },

  },
  {
    property: 'boss.name',
    header: {
      label: 'Boss',
      props: {
        style: {
          width: 100
        }
      }
    },

  },
  {
    property: 'country',
    header: {
      label: 'Country',
      props: {
        style: {
          width: 100
        }
      }
    },
    cell: {
      resolve: country => countries[country]
    },
  },
  {
    property: 'salary',
    header: {
      label: 'Salary',
      props: {
        style: {
          width: 100
        }
      }
    },
  },
  {
    property: 'active',
    header: {
      label: 'Active',
      props: {
        style: {
          width: 100
        }
      }
    },
    cell: {
      formatters: [
        active => active && <span>&#10003;</span>
      ]
    },
  },
]

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    salary: {
      type: 'integer'
    },
    boss: {
      $ref: '#/definitions/boss'
    },
    country: {
      type: 'string',
      enum: keys(countries),
      enumNames: values(countries)
    },
    active: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'position', 'salary', 'boss', 'country', 'active'],
  definitions: {
    boss: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    }
  }
};
const randomRows = generateRows(100, schema)

const Table1 = () => {
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <Table rows={randomRows} columns={cols} />
        
      </Grid>
    </Grid>
  )
};


export default Table1;
