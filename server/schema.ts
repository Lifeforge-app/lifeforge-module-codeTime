import z from 'zod'

const codeTimeSchemas = {
  daily_entries: {
    schema: z.object({
      date: z.string(),
      relative_files: z.any(),
      projects: z.any(),
      languages: z.any(),
      hourly: z.any(),
      total_minutes: z.number(),
      last_timestamp: z.number()
    }),
    raw: {
      id: 'eqmt5t9mkrgxf12',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: null,
      name: 'code_time__daily_entries',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          hidden: false,
          id: 'fkysyxdm',
          max: '',
          min: '',
          name: 'date',
          presentable: false,
          required: false,
          system: false,
          type: 'date'
        },
        {
          hidden: false,
          id: 's58x23cf',
          maxSize: 2000000,
          name: 'relative_files',
          presentable: false,
          required: false,
          system: false,
          type: 'json'
        },
        {
          hidden: false,
          id: 'nscrac1f',
          maxSize: 2000000,
          name: 'projects',
          presentable: false,
          required: false,
          system: false,
          type: 'json'
        },
        {
          hidden: false,
          id: 'aep18wlt',
          maxSize: 2000000,
          name: 'languages',
          presentable: false,
          required: false,
          system: false,
          type: 'json'
        },
        {
          hidden: false,
          id: 'json2768424363',
          maxSize: 0,
          name: 'hourly',
          presentable: false,
          required: false,
          system: false,
          type: 'json'
        },
        {
          hidden: false,
          id: '8xsxx2hj',
          max: null,
          min: null,
          name: 'total_minutes',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        },
        {
          hidden: false,
          id: 'av07akcm',
          max: null,
          min: null,
          name: 'last_timestamp',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_B0mAWvxXcb` ON `code_time__daily_entries` (`date`)'
      ],
      system: false
    }
  }
}

export default codeTimeSchemas
