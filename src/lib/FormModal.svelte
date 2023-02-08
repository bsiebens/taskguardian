<script>
	/**
	 * @type {string}
	 */
	export let id;
</script>

<input type="checkbox" {id} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
		<p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
		<div class="modal-action">
			<label for={id} class="btn">Yay!</label>
		</div>
	</div>
</div>
