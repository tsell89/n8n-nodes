import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Vitally implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Vitally',
		name: 'vitally',
		icon: 'file:vitally.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Vitally API',
		defaults: {
			name: 'Vitally',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'vitallyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'account',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'account',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an account',
						action: 'Get an account',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many accounts',
						action: 'Get many accounts',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create an account',
						action: 'Create an account',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an account',
						action: 'Update an account',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'user',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a user',
						action: 'Get a user',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many users',
						action: 'Get many users',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a user',
						action: 'Create a user',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a user',
						action: 'Update a user',
					},
				],
				default: 'get',
			},
			// Account ID for Get/Update operations
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'The ID of the account',
			},
			// User ID for Get/Update operations
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'The ID of the user',
			},
			// Additional fields for Create/Update operations
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the account/user',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						placeholder: 'name@email.com',
						description: 'Email address',
					},
					{
						displayName: 'Properties',
						name: 'properties',
						type: 'json',
						default: '{}',
						description: 'Additional properties as JSON',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		let responseData;

		// Get credentials
		const credentials = await this.getCredentials('vitallyApi');

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'account') {
					if (operation === 'get') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						// Implement account get logic
						responseData = { id: accountId, name: 'Example Account' };
					} else if (operation === 'getAll') {
						// Implement get all accounts logic
						responseData = [{ id: '1', name: 'Account 1' }, { id: '2', name: 'Account 2' }];
					} else if (operation === 'create') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							name?: string;
							email?: string;
							properties?: string;
						};
						// Implement account creation logic
						responseData = { id: 'new', ...additionalFields };
					} else if (operation === 'update') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							name?: string;
							email?: string;
							properties?: string;
						};
						// Implement account update logic
						responseData = { id: accountId, ...additionalFields };
					}
				} else if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						// Implement user get logic
						responseData = { id: userId, name: 'Example User' };
					} else if (operation === 'getAll') {
						// Implement get all users logic
						responseData = [{ id: '1', name: 'User 1' }, { id: '2', name: 'User 2' }];
					} else if (operation === 'create') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							name?: string;
							email?: string;
							properties?: string;
						};
						// Implement user creation logic
						responseData = { id: 'new', ...additionalFields };
					} else if (operation === 'update') {
						const userId = this.getNodeParameter('userId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							name?: string;
							email?: string;
							properties?: string;
						};
						// Implement user update logic
						responseData = { id: userId, ...additionalFields };
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map(item => ({ json: item })));
				} else if (responseData !== undefined) {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error instanceof Error ? error.message : 'Unknown error' } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 