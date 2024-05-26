<template>
  <div>
    <div class="flex gap-2 justify-end items-baseline mb-4">
      <form>
        <input
          id="search"
          type="text"
          class="border border-slate-600 p-2 rounded"
          placeholder="Search..."
        />
      </form>
    </div>
    <table
      role="grid"
      class="table-fixed border-collapse border-spacing-4 border border-black w-full"
    >
      <caption class="caption-bottom">
        Table Caption
      </caption>
      <thead>
        <tr>
          <th class="border border-slate-600 p-4">Column 1</th>
          <th class="border border-slate-600 p-4">Column 2</th>
          <th class="border border-slate-600 p-4">Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-700 p-4">Row 1, Column 1</td>
          <td class="border border-slate-700 p-4">Row 1, Column 2</td>
          <td class="border border-slate-700 p-4">Row 1, Column 3</td>
        </tr>
        <tr>
          <td class="border border-slate-700 p-4">Row 2, Column 1</td>
          <td class="border border-slate-700 p-4">Row 2, Column 2</td>
          <td class="border border-slate-700 p-4">Row 2, Column 3</td>
        </tr>
        <tr>
          <td class="border border-slate-700 p-4">Row 3, Column 1</td>
          <td class="border border-slate-700 p-4">Row 3, Column 2</td>
          <td class="border border-slate-700 p-4">Row 3, Column 3</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="border border-slate-700 p-4" colspan="3">Footer</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
