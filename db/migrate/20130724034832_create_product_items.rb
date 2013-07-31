class CreateProductItems < ActiveRecord::Migration
  def change
    create_table :product_items do |t|
      t.integer :quantity
      t.string :custom_options

      t.timestamps
    end
  end
end
