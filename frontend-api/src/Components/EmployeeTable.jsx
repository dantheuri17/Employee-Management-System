
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const initialData = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 50000 },
  { id: 2, name: 'Jane Smith', position: 'UI Designer', salary: 45000 },
  { id: 3, name: 'Bob Johnson', position: 'Project Manager', salary: 60000 },
];

const EmployeeTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <i className="anticon anticon-search">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M1002.2 913.8L739 650.6a406.7 406.7 0 1 0-57.4 57.4l263.2 263.2a40.5 40.5 0 0 0 57.4-57.4zM406.7 725.3a318.6 318.6 0 1 1 318.6-318.6 318.9 318.9 0 0 1-318.6 318.6z" />
        </svg>
      </i>
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    render: text =>
      searchedColumn === dataIndex ? (
        <a href="#!" style={{ textDecoration: 'underline' }}>
          {text}
        </a>
      ) : (
        text
      ),
  });

  const handleAdd = () => {
    setVisible(true);
    setEditing(false);
  };

  const handleEdit = record => {
    form.setFieldsValue(record);
    setVisible(true);
    setEditing(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      form.resetFields();
      setVisible(false);
      if (editing) {
        setData(data.map(item => (item.id === values.id ? { ...item, ...values } : item)));
      } else {
        setData([...data, { ...values, id: data.length + 1 }]);
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      ...getColumnSearchProps('position'),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
        Edit
             </Button>
     <Button type="link" danger onClick={() => setData(data.filter(item => item.id !== record.id))}>
       Delete
    </Button>
        </span>
    ),
   },
   ];

   return (
    <>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom:'10px' }}>
     <h3 style={{ textAlign: 'left', margin: 0 }}>Employee Status</h3>
      <Button type="primary" onClick={handleAdd} style={{ marginLeft: '10px' }}>
         Add Employee
      </Button>
    </div>
         <Table
           dataSource={data}
           columns={columns}
           rowKey="id"
           onRow={record => ({
          onClick: () => {
           // Navigate to employee details page when a row is clicked
           //console.log(Navigating to employee details page for employee ${record.id});
          },
        })}
        style={{ width: '750px' }} 

              />

              <Modal
              title={editing ? 'Edit Employee' : 'Add Employee'}
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              >

      <Form form={form} layout="vertical" initialValues={{ salary: 0 }}>
        <Form.Item name="id" hidden={true}>
        <Input />
        </Form.Item>
        <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the employee name' }]}
              >
              <Input />
        </Form.Item>
        <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please enter the employee position' }]}
              >
              <Input />
         </Form.Item>
         <Form.Item
              name="salary"
              label="Salary"
              rules={[
                { required: true, message: 'Please enter the employee salary' },
                { type: 'number', min: 0, message: 'Salary must be a positive number' },
              ]}
              >
              <Input type="number" />
        </Form.Item>
          </Form>
          </Modal>
       </>
    );
};

export default EmployeeTable;