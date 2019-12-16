/* eslint-disable no-undef */
'use strict';
const table = document.getElementById('table');
new GridManager(table, {
  gridManagerName: 'category',
  width: '80%',
  height: '80%',
  supportAjaxPage: true,
  ajaxData: '/api/getcategories',
  columnData: [
    {
      key: 'id',
      text: 'id',
    },
    {
      key: 'name',
      text: '名称',
    },
    {
      key: 'total_count',
      text: '总数',
    },
    {
      key: 'action',
      remind: 'the action',
      width: '100px',
      align: 'center',
      // disableCustomize: true,
      text: '<span style="color: red">操作</span>',
      // 直接返回 通过函数返回
      template: (action, row) => {
        return `<a href="javascript: void(0);" data-id="${row.id}" onclick="editRowData(this)">修改</span>`;
      },
    },
  ],
});

// eslint-disable-next-line no-unused-vars
function editRowData(dom) {
  console.log(dom);
}
