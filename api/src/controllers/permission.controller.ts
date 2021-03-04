// Uncomment these imports to begin using these cool features!
import {authenticate} from '@loopback/authentication';
import {get} from '@loopback/rest';
import {PermissionKeys} from '../authorization/permission-keys';
import {ApiVerssionConstants} from '../keys';

// import {inject} from '@loopback/core';

const {API_V1} = ApiVerssionConstants;

export class PermissionController {
  constructor() { }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.ListPermissions]}})
  @get(API_V1 + '/permissions', {
    responses: {
      '200': {
        description: 'Array of permissions',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: 'string',
            },
          },
        },
      },
    },
  })
  async find(): Promise<string[]> {
    return new Promise((resolve) => {
      resolve(Object.values(PermissionKeys))
    });
  }
}
