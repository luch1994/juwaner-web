/* eslint-disable no-undef */
'use strict';
const table = document.getElementById('table');
const idDom = document.querySelector('[name="id"]');
const nameDom = document.querySelector('[name="name"]');
const totalCountDom = document.querySelector('[name="total_count"]');
const csrfTokenDom = document.querySelector('[name="_csrf"]');

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

const editDialog = document.getElementById('editDialog');
const editDialogInst = new mdui.Dialog('#editDialog');

// eslint-disable-next-line no-unused-vars
async function editRowData(dom) {
  const id = dom.dataset.id;
  const res = await axios.get(`/api/getcategory?id=${id}`);
  if (res.status === 200) {
    renderEditModal(res.data);
  }
  editDialogInst.open();
}

editDialog.addEventListener('confirm.mdui.dialog', async function() {
  const category = {
    id: parseInt(idDom.value),
    name: nameDom.value,
    total_count: totalCountDom.value,
  };
  const res = await axios({
    url: '/api/updatecategory',
    method: 'POST',
    data: category,
    headers: {
      'x-csrf-token': csrfTokenDom.value,
    },
  });
  console.log(res);
});

function renderEditModal(category) {
  idDom.value = category.id;
  nameDom.value = category.name;
  totalCountDom.value = category.total_count;
}
