class CreateShippingInfos < ActiveRecord::Migration
  def change
    create_table :shipping_infos do |t|
      t.string :name
      t.string :address_one
      t.string :address_two
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.string :phone
      t.text :additional_info

      t.timestamps
    end
  end
end
