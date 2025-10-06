import z from 'zod'

const codeTimeSchemas = {
  projects: {
    schema: z.object({
      name: z.string(),
      duration: z.number()
    }),
    raw: {
      id: 'mde1cgke4ktc98i',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      name: 'code_time__projects',
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
          autogeneratePattern: '',
          hidden: false,
          id: 'mcmnpisn',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'rv6com9j',
          max: null,
          min: null,
          name: 'duration',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_kcio2htIml` ON `code_time__projects` (`name`)'
      ],
      system: false
    }
  },
  languages: {
    schema: z.object({
      name: z.string(),
      icon: z.string(),
      color: z.string(),
      duration: z.number()
    }),
    raw: {
      id: 'yxs5srmdf2ot8yk',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      name: 'code_time__languages',
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
          autogeneratePattern: '',
          hidden: false,
          id: 'c3yvxq4m',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'eqqf2pvy',
          max: 0,
          min: 0,
          name: 'icon',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 't9pq8fub',
          max: 0,
          min: 0,
          name: 'color',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'fsr7opin',
          max: null,
          min: null,
          name: 'duration',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_saW8u2ur3M` ON `code_time__languages` (`name`)'
      ],
      system: false
    }
  },
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
