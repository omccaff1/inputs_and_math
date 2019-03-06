$("body").on("keyup keydown keypress change", "input", function (e) {
	//We don't want to apply preventDefault here//
	console.log("Hello!");
	//Need to make sure our bind is working//
	const $this_input = $(this);
	//Dom object converted in jQuery object//
	//We're on input value and we need to get to row where value is//
	const $this_row = $this_input.closest("[data-tariff-percent]");
	//We're putting row next to get to that value. .closest knows we're going up to find another ancestor; find is for down. Takes us up to closest element with data-tariff-percentage. Find would take us down through descendants//
	//Other ways to do this: .item (finding closest ancestor w/ class item); 3rd: TR
	const $span_pre_total = $this_row.find(".pre_total").find("span");
	const $span_post_total = $this_row.find(".post_total").find("span");
	let qty = $this_row.find(".qty").find("input").val()
	//This first part gets us the cell. But we need the field. The field is a child of the cell.
	//In this row, find qty and find the closest input. Hey row, find me descendants w/ cell "qty;" hey cell, find me your input.//
	let cost = $this_row.find(".cost").find("input").val() //
	let tariff = $this_row.data("tariff-percent");
	//We need to put this in a variable//
	qty = parseFloat(qty);
	cost = parseFloat(cost);
	tariff = parseFloat(tariff);
	let tariff_decimal = tariff / 100;
	//Take tariff and make it into decimal so we can use it for math//
	let pre_tariff = qty * cost;
	//Now we want to show what before tariff is//
	let post_tariff = (qty * cost) * (1 + tariff_decimal);
	console.log("Qty", qty);
	console.log("Cost", cost);
	console.log("Tariff", tariff);
	console.log("pre_tariff", pre_tariff);
	console.log("post_tariff", post_tariff);

	$span_pre_total.text(pre_tariff);
	//This strips out all HTML in both directions//
	$span_post_total.text(post_tariff);
});

//Start totally separate bind for button//

$("body").on("click", ".calculate", function (e) {
	e.preventDefault();
	let pre_total = 0;
	$(".pre_total").each(function () {
		const $this_pre_total = $(this);
		const $this_pre_total_span = $this_pre_total.find("span");
		let value = $this_pre_total_span.text();
		value = parseFloat(value);
		pre_total = pre_total + value;

	});
	console.log("Working");
	console.log(pre_total);
});