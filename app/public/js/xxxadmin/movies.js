/* eslint-disable no-undef */
'use strict';
const table = document.getElementById('table');

const categories = {
  2: '奇幻/科幻',
  3: '律政/医务',
  4: '情景/喜剧',
  5: '罪案/谍战',
  6: '历史/剧情',
  7: '动作/战争',
  8: '都市/情感',
  9: '灵异/惊悚',
  10: '动漫/卡通',
};

new GridManager(table, {
  gridManagerName: 'movies',
  width: '100%',
  height: '100%',
  supportAjaxPage: true,
  ajaxData: '/api/getmovies',
  columnData: [
    {
      key: 'id',
      text: 'id',
      width: '80px',
    },
    {
      key: 'name',
      text: '名称',
      width: '200px',
    },
    {
      key: 'category',
      text: '分类',
      width: '100px',
      template: category => {
        return categories[category];
      },
    },
    {
      key: 'description',
      text: '描述',
      templae: description => {
        return `<span class="ellipse">${description}</span>`;
      },
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
