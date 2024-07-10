const Table = () => {


	return (
		<>
			<input
				type="text"
				className="px-3 w-[97%] rounded-md py-2 mb-6"
				placeholder="Search..."
			/>

			<table
				className="w-full rounded-md overflow-hidden"
			>
				<tbody>

					<tr
						className="cursor-pointer hover:bg-gray-200"
					>

						<td className="py-2">
							Test
						</td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export default Table
